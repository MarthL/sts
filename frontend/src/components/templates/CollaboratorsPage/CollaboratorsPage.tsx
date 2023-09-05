import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api/users';

export const CollaboratorsPage = () => {


  const [userCollection, setUserCollection] = useState(null);

  useEffect(() => {
    getAllUsers().then(async (res) => {
      setUserCollection(res);
    })
  }, [])

  console.log(userCollection);

  return (
    <>

    </>
  )
}