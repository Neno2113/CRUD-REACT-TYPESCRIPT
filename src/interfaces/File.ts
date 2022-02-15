// Generated by https://quicktype.io

export interface FileResponse {
    ok:    boolean;
    total: number;
    files: File[];
}

export interface File {
    title:       string;
    author:      string;
    fecha_pub:   string;
    description: string;
    user:        User;
    id:          string;
}

export interface User {
    _id:     string;
    name:    string;
    surname: string;
}