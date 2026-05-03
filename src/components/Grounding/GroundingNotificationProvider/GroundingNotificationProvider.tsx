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

  useEffect(() => {
    if (index >= filteredTechniques.length) setIndex(0);
  }, [filteredTechniques.length]);

  const {
    group: currentGroup,
    label: currentLabel,
    durationSeconds: currentDurationSeconds,
    colour: currentColour,
  } = filteredTechniques[index];

  useEffect(() => {
    const interval = setInterval(() => {
      if (grounding) {
        setIndex(previous => (previous + 1) % filteredTechniques.length);
      }
    }, currentDurationSeconds * 1000);

    return () => clearInterval(interval);
  }, [currentDurationSeconds, grounding]);

  useEffect(() => {
    const notificationDetails = {
      title: <Text size="md">{currentGroup}: {currentLabel}</Text>,
      message: <Text size="xs">You can disable grounding techniques in settings</Text>,
      color: currentColour,
      autoClose: false,
      withCloseButton: false
    };
    if (notificationId) {
      notifications.hide(notificationId);
    }
    const newNotificationId = notifications.show({
      ...notificationDetails
    });
    setNotificationId(newNotificationId);
  }, [index]);

  useEffect(() => {
    if (!grounding && notificationId) {
      setNotificationId(null);
      notifications.hide(notificationId);
    }
  }, [grounding]);

  return null;
}