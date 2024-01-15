# board-games

## To start the _backend_ server:
- go to backend directory
- run `npm install`
- run `npm run dev`

## To start the _frontend_ server:
- go to frontend directory
- run `npm install`
- run `npm run dev`

## Admin account
- email: `admin@yahoo.com`
- password: `12341234`

## Client account
- email: `client@yahoo.com`
- password: `12341234`

## Design patters
### Middleware 
- intre request si response sunt executate diferite metode
- aceste metode valideaza request-urile, token-ul de autentificare si erori care pot aparea
- de asemenea, aceste metode pot modifica request-ul sau response-ul inainte de trece la apelarea urmatoarelor metode
- aceste ajuta la crearea un cod care nu se repeta si la adaugarea usoara a functionalitatilor la metodele deja existente
<img src="Documentation/middleware.webp">
 https://medium.com/@techsuneel99/design-patterns-in-node-js-31211904903e

 ### Singleton & Observer
 - pentru a avea o singura stare a aplicatiei (sub forma unui arbore), folosim redux. Acesta este un <b>singleton</b> si se initializeaza o singura data pentru client
 <img src="Documentation/singleton.png">
 https://www.digitalocean.com/community/tutorials/java-singleton-design-pattern-best-practices-examples
 - de asemenea, cu ajutorul redux, am implementat <b>observer pattern</b>. Redux gestioneaza request-urile care se fac si rezultatul lor, dupa care componentele sunt instintate daca starea s-a schimbat, pentru a afisa continutul relevant. (De ex.: user-ul incearca sa se inregistreze, moment in care redux trimite request-ul si afiseaza un loading screen, iar in momentul in care request-ul returneaza un raspuns, componenta este instintata sa afiseze un mesaj de eroare sau de succes)
 <img src="Documentation/observer.webp">
 https://en.wikipedia.org/wiki/Observer_pattern#:~:text=In%20software%20design%20and%20engineering,calling%20one%20of%20their%20methods.