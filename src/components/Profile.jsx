import { useState } from "react";

import {
  useSession,
  CombinedDataProvider,
  Image,
  Text, LogoutButton,
} from "@inrupt/solid-ui-react";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";


export const Profile = () => {
  const { session } = useSession();
  const { webId } = session.info;

  return (
    <div>
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <div>
          <Image property={VCARD.hasPhoto.iri.value} width={480} />
        </div>
        <div>
          <Text property={FOAF.name.iri.value} autosave />
        </div>
      </CombinedDataProvider>
    </div>
  )
}