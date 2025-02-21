<template>
  <div ref="terminalOutContainer" class="mb-0" style="height: 100%; width: 100%;">
    <div ref="terminalContainer" class="terminal" style="height: 300px; width: 100%;"></div>
  </div>
</template>

<script lang="ts" setup>
// import '@xterm/xterm/css/xterm.css'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { AttachAddon } from '@xterm/addon-attach'
import { WebLinksAddon } from '@xterm/addon-web-links';
import debounce from 'debounce'
import { genStopCommand } from '@/util/AppCommandUtil';
import { useExternalStyle } from '@/hooks/useExternalStyle';
// import { useExternalScript } from '@/hooks/useExternalScript';

if(import.meta.env.MODE === 'development') {
  useExternalStyle('./libs/xterm/5.5.0/xterm.min.css')
  // useExternalScript('./libs/xterm/5.5.0/xterm.js')
}

const emit = defineEmits([
  'executeEnd'
])

const foundEndKeywords = ref<string[]>([])
const executeEndEmitted = ref<boolean>(false)

const props = defineProps<{
  socketURI: string,
  initCommand?: string,
  // Command output message include some special keywords. we should check those and emit event.
  commandExecuteEndKeywords?: string[]
}>()

const socket = ref<WebSocket | null>(null);
const terminal = ref<Terminal | null>(null);
const terminalOutContainer = ref<HTMLElement | null>(null);
const terminalContainer = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver;

onMounted(() => {
  initSocket()
  initResizeObserver()
})

onUnmounted(() => {
  socket.value?.close()
  terminal.value?.dispose()
  if (resizeObserver && terminalContainer.value) {
    resizeObserver.unobserve(terminalContainer.value);
    resizeObserver.disconnect();
  }
});

const runCommand = (command: string) => {
  console.log('runCommand', command)
  console.log('runCommand socket.value', socket.value)
  // terminal.value?.writeln(command);
  socket.value?.send(command+'\n')
}

const runStopCommand = () => {
  // runCommand('\x03') // ctrl+c
  const stopCmd = genStopCommand()
  runCommand(stopCmd)
}

const exitTerminal = () => {
  runCommand('exit')// exit
}

defineExpose({
  runCommand,
  runStopCommand,
  exitTerminal
})

const initTerm = () => {
  if (!terminalContainer.value) return;
  if (!socket.value) return;
  const term = new Terminal({
    fontSize: 14,
    cursorBlink: true
  });
  const attachAddon = new AttachAddon(socket.value);
  const fitAddon = new FitAddon();
  const webLinksAddon = new WebLinksAddon((event: MouseEvent, uri: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', uri);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'lmdTempLink');
    const tempLink = document.getElementById('lmdTempLink')
    if(tempLink) {
      document.body.removeChild(tempLink);
    }
    document.body.appendChild(a);
    a.click();
  });

  term.loadAddon(attachAddon);
  term.loadAddon(fitAddon);
  term.loadAddon(webLinksAddon);
  term.open(terminalContainer.value);
  fitAddon.fit();
  term.focus();

  terminal.value = term
}

const handleResize = (entries: ResizeObserverEntry[]) => {
  for (const entry of entries) {
    // console.log(`Width: ${entry.contentRect.width}px, Height: ${entry.contentRect.height}px`);
    // terminalContainer.value?.offsetWidth
    // terminalContainer.value?.offsetHeight
    resizeTerminal(entry.contentRect.width, entry.contentRect.height)
  }
};

const debouncedHandleResize = debounce(handleResize, 50);

const initResizeObserver = () => {
  if (terminalOutContainer.value) {
    resizeObserver = new ResizeObserver(debouncedHandleResize);
    resizeObserver.observe(terminalOutContainer.value);
  }
};

const initSocket = () => {
  socket.value = new WebSocket(props.socketURI);
  socketOnClose();
  socketOnOpen();
  socketOnError();
  checkStatus()
}

const checkStatus = () => {
  // if (props.commandExecuteEndKeywords &&
  if(socket.value) {
    socket.value.onmessage = (event) => {
      const dataStr: string = event.data
      const keywords = props.commandExecuteEndKeywords
      if(!keywords) {
        return
      }
      keywords.forEach(keyword => {
        if(dataStr.includes(keyword) && !foundEndKeywords.value.includes(keyword)) {
          foundEndKeywords.value.push(keyword)
        }
      })

      if(foundEndKeywords.value.length === keywords.length) {
        // if(!executeEndEmitted.value) {
        // console.log('emit executeEnd foundEndKeywords.value.length', foundEndKeywords.value.length)
        // console.log('emit executeEnd keywords.length', keywords.length)
          emit('executeEnd')
          executeEndEmitted.value = true
          foundEndKeywords.value = []
        // }
      }
    }
  }
  // }
}

const socketOnOpen = () => {
  if(socket.value) {
      socket.value.onopen = () => {
        // 链接成功后
        initTerm()
        if(props.initCommand) {
          runCommand(props.initCommand)
        }
      }
    }
}
const socketOnClose = () => {
  if(socket.value) {
    socket.value.onclose = (event) => {
      console.log('close socket', event)
    }
  }
}

const socketOnError = () => {
  if(socket.value) {
    socket.value.onerror = (event) => {
      console.log('socket 链接失败', event)
    }
  }
}

const terminalCols = ref(80)
const terminalRows = ref(30)

const resizeTerminal = (width: number, height: number) => {
  const cols = Math.floor(width / 8.5);
  const rows = Math.round(height / 16);

  console.log('cols', width, cols)
  console.log('rows', height, rows)
  if(rows === 0 || cols === 0) {
    return
  }
  if(terminalCols.value !== cols || terminalRows.value !== rows) {
    terminalCols.value = cols
    terminalRows.value = rows
    terminal.value?.resize(cols, rows);
    const msg = `lmd_action:resize:${cols},${rows}`
    // console.log('send to server ', msg)
    socket.value?.send(msg)
  }

}

</script>
<style>

</style>
