export const {
  PORT = 4000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY = 'This-is-an-awesome-secret-key-to-miglenest-developtment-debe-ser-mucho-mas-largo-y-seguro'
  // En produccion es recomendable inyectar como variable de entorno
} = process.env
