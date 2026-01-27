import dotenv from 'dotenv';
dotenv.config();

const whitelist = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173',  
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200 
};