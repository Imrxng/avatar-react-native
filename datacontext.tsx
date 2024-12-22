
import React, { useEffect, useState } from "react";
import { Character, Episodes, Info, Question } from "./types";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

const standard = require("./assets/images/standaard.webp");

interface IDataContext {
    characters: Character[];
    info: Info[];
    episodes: Episodes[];
    questions: Question[];
    theme: any;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    favorites: number[];
    toggleFavorite: (id: number) => void;
    profileImage: any;
    setProfileImage: React.Dispatch<any>;
}

export const DataContext = React.createContext<IDataContext>({ characters: [], info: [], episodes: [], questions: [], theme: standard, setTheme: () => { }, favorites: [], toggleFavorite: () => { }, setCharacters: () => { }, setProfileImage: () => { }, profileImage: '' });

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<Info[]>([]);
    const [episodes, setEpisodes] = useState<Episodes[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [theme, setTheme] = useState(standard);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [profileImage, setProfileImage] = useState(require("./assets/images/favicon.png"));


    useEffect(() => {
        const fetchQuestions = async () => {
            const headers = { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDgyODZAYXAuYmUiLCJpYXQiOjE3MzI0Njc4OTR9.-438L0SbjLp_bNLLPG65ryDAS-cBEn_t2KT2n8fpkVA" }
            const responseCharacters = await fetch("https://sampleapis.assimilate.be/avatar/characters", { headers });
            const responseInfo = await fetch("https://sampleapis.assimilate.be/avatar/info");
            const responseEpisodes = await fetch("https://sampleapis.assimilate.be/avatar/episodes");
            const responseQuestions = await fetch("https://sampleapis.assimilate.be/avatar/questions");

            const dataCharacters: Character[] = await responseCharacters.json();
            const dataInfo: Info[] = await responseInfo.json();
            const dataEpisodes: Episodes[] = await responseEpisodes.json();
            const dataQuestions: Question[] = await responseQuestions.json();

            setCharacters(dataCharacters);
            setInfo(dataInfo);
            setEpisodes(dataEpisodes);
            setQuestions(dataQuestions);
        };
        const askForNotificationPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissie voor meldingen niet verleend!');
            }
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Nieuwe aflevering beschikbaar 📺",
                    body: "Bekijk nu je favoriete aflevering!",
                    data: { screen: 'Episodes' },
                },
                trigger: {
                    seconds: 1,
                    channelId: 'episodes',
                },
            });
        };
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        };
        const localStorageGetTheme = async () => {
            const itemTheme = await AsyncStorage.getItem("theme");
            if (itemTheme) {
                setTheme(JSON.parse(itemTheme));
            }
        }

        const localStorageGetProfilePic = async () => {
            const profilePic = await AsyncStorage.getItem("profileImage");
            if (profilePic) {
                setProfileImage(JSON.parse(profilePic));
            }
        }
        setTimeout(() => {
            askForNotificationPermissions();
        }, 5000);
        fetchQuestions();
        loadFavorites();
        localStorageGetTheme();
        localStorageGetProfilePic();
    }, []);

    useEffect(() => {
        const localStorageWrite = async () => {
            await AsyncStorage.setItem("theme", JSON.stringify(theme));
        }
        localStorageWrite();
    }, [theme]);


    useEffect(() => {
        const localStorageWrite = async () => {
            await AsyncStorage.setItem("profileImage", JSON.stringify(profileImage));
        }
        localStorageWrite();
    }, [profileImage]);

    const toggleFavorite = async (id: number) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <DataContext.Provider value={{ characters: characters, info: info, episodes: episodes, questions: questions, theme: theme, setTheme: setTheme, favorites: favorites, toggleFavorite: toggleFavorite, setCharacters: setCharacters, profileImage: profileImage, setProfileImage: setProfileImage }}>
            {children}
        </DataContext.Provider>
    );
}
