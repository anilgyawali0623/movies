
import mongoose from 'mongoose';
import {Cinema }from './cinema.model.js';

const city = new mongoose.Schema({
    name: {
      type: String,
      required: true,
       lowercase: true,
    },
    cinemas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
    }],
  }, { timestamps: true });
  
   export const City = mongoose.model('City', city);
