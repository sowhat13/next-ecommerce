import { motion } from 'framer-motion'
import styles from './spinner.module.scss'
import type { NextPage } from 'next';

interface SpinnerProps {

    className?: string;
    rest?: any;
    color?: string;

}
const LoadingSpinner: NextPage<SpinnerProps> = ({ className, color, ...rest }) => {
    return (

        <div className={`${styles.loadingSpinner} ${className ? className + ' !border-t-transparent dark:!border-t-transparent' : ''}`} />

    )
}

export default LoadingSpinner