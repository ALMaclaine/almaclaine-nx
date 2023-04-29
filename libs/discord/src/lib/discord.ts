import fetch, { FormData } from 'node-fetch';

function discordWebhook(url: string, content: string) {
  const formData = new FormData();
  formData.set('payload_json', JSON.stringify({ content }));
  return fetch(url, { method: 'POST', body: formData });
}

export { discordWebhook };
