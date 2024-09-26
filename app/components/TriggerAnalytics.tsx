"use client";
import React from 'react'
import { createFirebaseApp } from '../../lib/firebase/firebase';

const TriggerAnalytics = () => {
  React.useEffect(() => {
    createFirebaseApp();
  }, []);

  return (
    <div></div>
  )
}

export default TriggerAnalytics