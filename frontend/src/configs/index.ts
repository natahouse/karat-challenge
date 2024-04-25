export const configs = {
  useMocks: process.env.NEXT_PUBLIC_USE_MOCKS === "true",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
}
