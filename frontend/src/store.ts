import {create} from "zustand";

type State ={
    day: Date ;
}

type Action = {
    updateDate: (day: State['day'] ) => void
}


export const useCalendarStore = create<State & Action>()((set)=>({
    day : new Date(),
    updateDate: (day:Date) => set(() => ({day:day})),
}));