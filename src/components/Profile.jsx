import { useState } from "react";

import {
  useSession,
  CombinedDataProvider,
  Image,
  Text, LogoutButton,
} from "@inrupt/solid-ui-react";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";


export const Profile = () => {
  const { session, sessionRequestInProgress } = useSession();
  const { webId } = session.info;
  const [editing, setEditing] = useState(false);

  return (
    <div>
      {!sessionRequestInProgress && session.info.isLoggedIn && (
        <LogoutButton
          onError={console.error}
          onLogout={() => window.location.reload()}
        >
          Log out
        </LogoutButton>
      )}
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Image property={VCARD.hasPhoto.iri.value} width={480} />
        <Text property={FOAF.name.iri.value} edit={editing} autosave />

      </CombinedDataProvider>
    </div>
  )
}