import { useState } from 'react';
import { useHistory } from 'react-router';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Background from '../../assets/background.png';
import { theme } from './styles';
import LoginForm from './LoginForm'
import BackdropInherit from '../feedback/Backdrop';
import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export {
    Avatar, CssBaseline, Box, ConfirmationNumber, Typography,
    ThemeProvider, Grid, Paper, Background, theme, LoginForm, BackdropInherit,
    useState, useHistory, useForm, Alert, TextField, Button
}