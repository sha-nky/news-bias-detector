import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import axios from "axios";

export async function invokeSageMakerEndpoint(article: string): Promise<any> {
  const accessKeyId = "AKIAQMEY5UZA6NGXB57I";
  const secretAccessKey = "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";
  const region = "eu-north-1";
  const endpoint = "https://runtime.sagemaker.eu-north-1.amazonaws.com/endpoints/huggingface-pytorch-inference-2024-11-20-06-46-49-761/invocations";

  const requestBody = JSON.stringify({ "text": article });

  const signer = new SignatureV4({
    service: "sagemaker",
    region,
    credentials: { accessKeyId, secretAccessKey },
    sha256: Sha256,
  });

  const signedRequest = await signer.sign({
    method: "POST",
    protocol: "https:",
    hostname: "runtime.sagemaker.eu-north-1.amazonaws.com",
    path: "/endpoints/huggingface-pytorch-inference-2024-11-17-19-19-37-103/invocations",
    headers: {
      "Content-Type": "application/json",
      "Host": "runtime.sagemaker.eu-north-1.amazonaws.com",
    },
    body: requestBody,
  });

  try {
    const response = await axios({
      method: signedRequest.method,
      url: endpoint,
      headers: signedRequest.headers,
      data: requestBody,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw error;
    } else if (error instanceof Error) {
      console.error("General error:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred:", error);
      throw new Error("Unknown error occurred");
    }
  }  
}