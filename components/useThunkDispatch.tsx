import React from 'react';
import { useDispatch } from 'react-redux';
import { IThunkDispatch } from '../models/store';

const useThunkDispatch = () =>  useDispatch<IThunkDispatch<any>>();

export default useThunkDispatch
