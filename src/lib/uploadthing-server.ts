import { UTApi } from "uploadthing/server";

let utapiClient: UTApi | null = null;

async function initUTApiClient() {
  try {
    utapiClient = new UTApi();

    return utapiClient;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteFromUT(key: string) {
  try {
    if (!utapiClient) {
      utapiClient = await initUTApiClient();
    }

    await utapiClient.deleteFiles([key]);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
