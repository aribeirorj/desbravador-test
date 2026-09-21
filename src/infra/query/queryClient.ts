import { QueryClient } from "@tanstack/react-query";
import { NetworkError } from "../http/errors";

/**
 * Repetir só falhas de rede, e uma vez. Um 404 ou um limite estourado não
 * mudam com uma nova tentativa — só gastariam o limite de requisições.
 */
export function shouldRetry(failureCount: number, error: unknown): boolean {
  return error instanceof NetworkError && failureCount < 1;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dados do GitHub mudam devagar; protege o limite de 60 requisições/hora.
      staleTime: 5 * 60 * 1000,
      // O padrão refaria as requisições a cada troca de janela.
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
  },
});
