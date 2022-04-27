// En production, nous enregistrons un agent de service pour servir les actifs à partir du cache local.

// Cela permet à l'application de se charger plus rapidement lors des visites ultérieures en production et donne
// il a des capacités hors ligne. Cependant, cela signifie également que les développeurs (et les utilisateurs)
// ne verra les mises à jour déployées qu'à la visite "N+1" d'une page, car auparavant
// les ressources mises en cache sont mises à jour en arrière-plan.


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Le constructeur d'URL est disponible dans tous les navigateurs prenant en charge SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Notre service worker ne fonctionnera pas si PUBLIC_URL est sur une origine différente
       // à partir de ce sur quoi notre page est servie. Cela peut arriver si un CDN est utilisé pour
       return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Cela s'exécute sur localhost. Vérifions si un service worker existe toujours ou non.
        checkValidServiceWorker(swUrl);

        // Ajoutez une journalisation supplémentaire à localhost, pointant les développeurs vers le
         // documentation du service worker/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // N'est pas un hôte local. Enregistrez simplement un travailleur de service
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
             // À ce stade, l'ancien contenu aura été purgé et
               // le nouveau contenu aura été ajouté au cache.
               // C'est le moment idéal pour afficher un "Nouveau contenu est
               // disponible; veuillez actualiser." message dans votre application Web.
              console.log('Un nouveau contenu est disponible ; Rafraichissez, s\'il vous plait.');
            } else {
              // À ce stade, tout a été pré-caché.
               // C'est le moment idéal pour afficher un
               // "Le contenu est mis en cache pour une utilisation hors ligne." message.
              console.log('Le contenu est mis en cache pour une utilisation hors ligne.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Erreur lors de l\'inscription du service worker :', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Vérifie si le service worker peut être trouvé. S'il ne peut pas recharger la page.
  fetch(swUrl)
    .then(response => {
      // Assurez-vous que le service worker existe et que nous obtenons vraiment un fichier JS.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // Aucun service worker trouvé. Probablement une autre application. Recharge la page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker trouvé. Procédez normalement.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'Aucune connexion Internet trouvée. L\'application s\'exécute en mode hors ligne.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
