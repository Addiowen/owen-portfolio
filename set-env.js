const fs = require('fs');
const path = require('path');

const env = `export const environment = {
  production: true,
  emailjs: {
    serviceId:  '${process.env.EMAILJS_SERVICE_ID  || ''}',
    templateId: '${process.env.EMAILJS_TEMPLATE_ID || ''}',
    publicKey:  '${process.env.EMAILJS_PUBLIC_KEY  || ''}',
  }
};
`;

const targetPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, env);
console.log('✓ environment.ts generated from Vercel env vars');