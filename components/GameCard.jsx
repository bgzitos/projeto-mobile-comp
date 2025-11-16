import { StyleSheet, View, Text, Image, Animated, Pressable } from "react-native";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function GameCard({ game }) {
    if (!game) return null;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const { colors } = useTheme();
    const styles = createStyles(colors);


    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.90,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Link href={`/game/${game.id}`} asChild>
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={[
                    styles.card, 
                    { 
                        opacity: fadeAnim, 
                        transform: [{ scale: scaleAnim }]
                    }
                ]}>
                    <Image source={{ uri: game.background_image }} style={styles.coverImage} />
                    <Text style={styles.title}>{game.name}</Text>
                    <Text style={styles.rating}>Avaliação: {game.rating}</Text>
                </Animated.View>
            </Pressable>
        </Link>
    );
}


const createStyles = (colors) => StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: 180,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.cardText,
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    rating: {
        fontSize: 14,
        color: colors.cardText,
        paddingHorizontal: 12,
        paddingBottom: 10,
    },
});