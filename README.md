# **PDF AI SaaS App**

A PDF AI SaaS full stack app has built with Next.js framework, Shadcn UI, OpenAI, LangChain, Stripe and more. The app allows users to upload any PDF document with size limit based on the subscription plan and search for specific information inside this document. Only authenticated users can use the platform. There are 2 options: Free plan with limited usage and Pro plan to give more features into the user.

### Demo video: [Link](https://www.youtube.com/watch?v=cYNyzFaP39A)

## Features

- Allow user to log in to the platform
- Allow user to upload any PDF document and search for any content inside this
- Intuitive Drag n&apos; Drop Uploads
- PDF Viewer to see the uploaded PDF document
- 100% written in TypeScript
- OpeanAI text embedding model has been used to embedding the pdf file and gpt-4o to chat with the document
- LangChain use to integrate LLM into the app
- Pinecone Vector Database has been used to store embeds data into vector space
- MongoDB NoSQL Database has been used to store user, document and chat informations
- Stripe payment is used with webhook for payment in order to retrive information about the status of the payment
- Next.js framework is used to create full stack app
- Tailwind CSS is used with Shadcn UI component library to built beautiful design
- Prisma ORM is used to communicate with database

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Generate auth secret, which automatically create .env.local file for environment variables (you can use _.env_ later and put the secret into it):
   `npx auth secret`
4. Set up Google OAuth: [Google](https://www.youtube.com/watch?v=ot9yuKg15iA&t=210s)
5. Create stripe account and get keys [link](https://dashboard.stripe.com/test/apikeys).
6. Add stripe webhook endpoint [link](https://dashboard.stripe.com/test/webhooks).
7. Activate stripe billing portal [link](https://dashboard.stripe.com/test/settings/billing/portal).
8. Create pinecone index [link](https://www.pinecone.io/).
9. Add environment variables into the .env file:<br>
   `AUTH_SECRET="<YOUR-SECRET>"`<br>
   `AUTH_GOOGLE_ID="<YOUR-GOOGLE-ID>"`<br>
   `AUTH_GOOGLE_SECRET="<YOUR-GOOGLE-SECRET>"`<br>
   `DATABASE_URL="<YOUR-DATABASE-URL>"`<br>
   `UPLOADTHING_TOKEN="<YOUR-UPLOADTHING-TOKEN>"`<br>
   `PINECONE_API_KEY="<YOUR-PINECONE-TOKEN>"`<br>
   `OPENAI_API_KEY="<YOUR-OPENAI-TOKEN>"`<br>
   `STRIPE_SECRET_KEY="<YOUR-STRIPE-SECRET-TOKEN>"`<br>
   `STRIPE_WEBHOOK_SECRET="<YOUR-STRIPE-WEBHOOK-SECRET-TOKEN>"`<br>
   `STRIPE_PRODUCT_PRICE_ID="<YOUR-STRIPE-PRO-PLAN-PRICE-ID>"`<br>
10. Create new product with features on stripe: [link](https://docs.stripe.com/billing/quickstart)
11. Run `npm run prisma:generate` in order to apply prisma schema
12. Run `npm run prisma:push` to push db to MongoDB
13. Run `npm run dev` command in your terminal
14. Server running at `http://localhost:3000/`

### Useful links and informations

- Prisma **env.local** handling:
  - [Stackoverflow](https://stackoverflow.com/questions/70491569/how-to-set-environment-variables-with-prisma-nextjs-and-vercel)
- Prisma and MongoDB edge compatibility:
  - [Auth.js](https://authjs.dev/guides/edge-compatibility)
- Auth.js code example:
  - [GitHub](https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs)
- Google Provider config page:
  - [Google](https://console.developers.google.com/apis/credentials)
  - [Youtube](https://www.youtube.com/watch?v=ot9yuKg15iA&t=210s)
- Stripe, checkout session, webhook:
  - [GitHub #1](https://github.com/stripe/stripe-node)
  - [GitHub #2](https://github.com/stripe-samples/accept-a-payment/blob/main/prebuilt-checkout-page/server/node/server.js)
  - [Linkedin.com](https://www.linkedin.com/pulse/how-create-stripe-webhook-nextjs-1344-mohsin-ali-soomro/)
  - [Dev.to](https://dev.to/mohsinalisoomro/how-to-create-stripe-webhook-in-nextjs-1344-5fn)
  - [Medium.com](https://medium.com/@lev"<YOUR-STRIPE-SIGNATURE-TOKEN>"i.schouten.werk/building-a-payment-flow-in-next-js-13-using-stripe-mailsender-and-webhooks-291996bf1b24)
- Stripe Test cards:
  - [Stripe.com](https://stripe.com/docs/checkout/quickstart#testing)

### Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [Typescript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI]()
- [React Dropzone](https://www.npmjs.com/package/react-dropzone)
- [React PDF](https://www.npmjs.com/package/react-pdf)
- [Sonner](https://sonner.emilkowal.ski/)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [Sharp Image optimalization](https://www.npmjs.com/package/sharp)
- [Auth.js](https://authjs.dev/)
- [Prisma](https://www.prisma.io/)
- [Langchain](https://js.langchain.com/docs/introduction/)
- [Pinecone](https://www.pinecone.io/)
- [Uploadthing](https://docs.uploadthing.com/)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [Stripe](https://docs.stripe.com/)

### Layout

![layout-1 picture](https://github.com/ev0clu/pdf-ai-saas/blob/main/public/quiri-pdf.png?raw=true)<br>
