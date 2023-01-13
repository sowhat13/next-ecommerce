import { createContext } from 'react';



interface ContextWrapperType {
    alerts?: any[];
    addAlert?: (value: any) => void;
    setAlerts?: (value: any[]) => void;
}

export const ContextWrapper = createContext<ContextWrapperType>({} as ContextWrapperType);