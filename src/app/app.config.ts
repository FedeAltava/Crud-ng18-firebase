import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'crud-ng18',
        appId: '1:574070946902:web:f1eb388d25b1c3109d8ff7',
        storageBucket: 'crud-ng18.firebasestorage.app',
        apiKey: 'AIzaSyAuaMOxerRANRVgQEJUkqVj627-Vn2qhSA',
        authDomain: 'crud-ng18.firebaseapp.com',
        messagingSenderId: '574070946902',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
