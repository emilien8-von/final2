import React from 'react'
import './css/mention.scss'
import { Link } from 'react-router'

const Mention = () => {
  return (
    <div className="legal-notice-page">
            <div className="legal-notice-container">
                <h1>Mentions Légales</h1>
                <p className="breadcrumb"><Link to="/">Accueil</Link> &gt; Mentions Légales</p>
                <hr className="separator" />

                <section>
                    <h2>Éditeur du site</h2>
                    <p>
                        <strong>Nom du site :</strong> Alpha Gaming <br />
                        <strong>Propriétaire :</strong> Eminox <br />
                        <strong>Email :</strong> <a href="mailto:[Votre Email]">zeirbtalash307@gmail.com</a> <br />
                        <strong>Directeur de la publication :</strong> emicrac
                    </p>
                </section>

                <section>
                    <h2>Hébergement</h2>
                    <p>
                        <strong>Hébergeur :</strong> vercel <br />
                        <strong>Adresse :</strong> localhost:3000 <br />
                        <strong>Site Web :</strong> https://final3-eta.vercel.app/
                    </p>
                </section>

                <section>
                    <h2>Propriété Intellectuelle</h2>
                    <p>
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                    </p>
                </section>

                <section>
                    <h2>Données personnelles</h2>
                    <p>
                        Conformément à la loi "Informatique et Libertés" du 6 janvier 1978, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent. Vous pouvez exercer ce droit en nous contactant via l'adresse email fournie ci-dessus.
                    </p>
                </section>
            </div>
        </div>
  )
}

export default Mention
