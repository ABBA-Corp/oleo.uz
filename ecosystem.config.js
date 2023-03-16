module.exports = {
  apps: [
    {
      name: 'oleo.uz',
      exec_mode: 'cluster',
      env: {
            "PORT": 3020,
            "NODE_ENV": "production",
            "NEXT_PUBLIC_ENDPOINT": "https://oleoapi.itlink.uz/api"
        },
      instances: 1, // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3020'
    }
  ]
}
