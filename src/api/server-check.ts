import api from './axios'

async function callApiWithRetry(url: string, options: any = {}, retries: number = 100): Promise<any> {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  async function attemptRequest(attempt: number): Promise<any> {
      try {
          console.log(`Attempt ${attempt}: Calling API...`);
          const response = await api(url, options);
          return response;
      } catch (error) {
          if (attempt < retries) {
              console.error(`Attempt ${attempt} failed. Retrying in 1000ms...`);
              await delay(1000); // Wait for 1000 milliseconds before retrying
              return attemptRequest(attempt + 1);
          } else {
              console.error('All attempts failed. Throwing error...');
              throw new Error('Failed to call API after 100 attempts');
          }
      }
  }

  return attemptRequest(1);
}
export const healthCheck = async () => {
  let result
  try {
    const response =  await callApiWithRetry(`/health-check`)
    result = response.data
  } catch(err) {
    console.log('health check err', err)
    return result
  }

}
