'use client';

import React, {useEffect, useState} from 'react';
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { groundingTechniques } from "@/src/components/Grounding/GroundingNotificationProvider/groundingTechniques";
import { useSettings } from "@/src/components/Settings/SettingsProvider/SettingsContext";

export const GroundingNotificationProvider: React.FC = () => {
  const { settings: { grounding } } = useSettings();
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);

  const activeGroups = grounding
    .filter(technique => technique.active)
    .map(technique => technique.group);
  const filteredTechniques = groundingTechniques.filter(technique => activeGroups.includes(technique.group));
  const techniquesActive = filteredTechniques.length > 0;

  useEffect(() => {
    if (index >= filteredTechniques.length) setIndex(0);
  }, [filteredTechniques.length]);

  const currentTechnique = filteredTechniques.at(index);

  useEffect(() => {
    const interval = setInterval(() => {
      if (techniquesActive) {
        setIndex(previous => (previous + 1) % filteredTechniques.length);
      }
    }, (currentTechnique?.durationSeconds ?? 1) * 1000);

    return () => clearInterval(interval);
  }, [currentTechnique?.durationSeconds, grounding]);

  useEffect(() => {
    const notificationDetails = {
      title: <Text size="md">{currentTechnique?.group}: {currentTechnique?.label}</Text>,
      message: <Text size="xs">You can disable grounding techniques in settings</Text>,
      color: currentTechnique?.colour,
      autoClose: false,
      withCloseButton: false
    };
    if (techniquesActive) {
      if (notificationId) {
        notifications.hide(notificationId);
      }
      const newNotificationId = notifications.show({
        ...notificationDetails
      });
      setNotificationId(newNotificationId);
    }
  }, [index]);

  useEffect(() => {
    if (!techniquesActive && notificationId) {
      setNotificationId(null);
      notifications.hide(notificationId);
    }
  }, [grounding]);

  return null;
}