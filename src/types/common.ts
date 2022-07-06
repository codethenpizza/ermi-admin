import {Dispatch, SetStateAction} from "react";

export type GetStateFn<T = any> = () => [T, Dispatch<SetStateAction<T>>];
