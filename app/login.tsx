import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import { loginUser } from "@/services/auth/authService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const theme = useTheme();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleCreateAccount = () => {
        router.push("/create-account");
        
    }

    const handleSignIn = () => {
        setIsLoading(true);
        console.log('Login attempt with:', email, password);
        // Simulate API call
        loginUser(email, password).then((userCredential) => {
            setIsLoading(false);
            const user = userCredential.user;
        }).catch(error => {
            setIsLoading(false);
        });
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <CostingSafeAreaView >
                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        <View style={styles.logoContainer}>
                            {/* Replace this URI with your actual logo URL */}
                            <Image
                                source={require('@/assets/images/splash-icon.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text variant="bodyMedium" style={styles.subtitle}>
                                Gestión inteligente de inventario y costes de recetas
                            </Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                mode="flat"
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                                left={<TextInput.Icon icon="email-outline" />}
                                theme={{ colors: { primary: theme.colors.primary } }}
                                outlineColor="#e5e7eb"
                                activeOutlineColor={theme.colors.primary}
                            />

                            <TextInput
                                mode="flat"
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureTextEntry}
                                style={styles.input}
                                left={<TextInput.Icon icon="lock-outline" />}
                                right={<TextInput.Icon
                                    icon={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                                    onPress={toggleSecureEntry}
                                />}
                                theme={{ colors: { primary: theme.colors.primary } }}
                                outlineColor="#e5e7eb"
                                activeOutlineColor={theme.colors.primary}
                            />

                            <Button
                                mode="contained"
                                onPress={handleSignIn}
                                style={styles.loginButton}
                                labelStyle={styles.buttonLabel}
                                contentStyle={styles.buttonContent}
                                disabled={!email || !password || isLoading}
                                icon={isLoading ? () => <ActivityIndicator color="#fff" /> : ""}
                            >
                                {isLoading ? '' : 'Login'}
                            </Button>

                            <View style={styles.socialLoginContainer}>
                                <Text style={styles.socialLoginText}>O continua con</Text>
                                <View style={styles.socialButtons}>
                                    <Button
                                        mode="outlined"
                                        style={styles.socialButton}
                                        icon={() => <MaterialCommunityIcons name="google" size={20} color="#DB4437" />}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        mode="outlined"
                                        style={styles.socialButton}
                                        icon={() => <MaterialCommunityIcons name="apple" size={20} color="#000" />}
                                    >
                                        Apple
                                    </Button>
                                </View>
                            </View>

                            <View style={styles.footer}>
                                <Button
                                    mode="text"
                                    onPress={() => console.log('Forgot password pressed')}
                                    textColor={theme.colors.secondary}
                                    compact
                                >
                                    Olvidaste tu Contraseña?
                                </Button>
                                <View style={styles.signupContainer}>
                                    <Text style={styles.signupText}>No tienes una cuenta?</Text>
                                    <Button
                                        mode="text"
                                        onPress={handleCreateAccount}
                                        textColor={theme.colors.primary}
                                        compact
                                    >
                                        Crear Cuenta
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </CostingSafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 48,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    title: {
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        color: '#64748b',
        fontSize: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        fontSize: 16,
    },
    loginButton: {
        marginTop: 16,
        borderRadius: 12,
        backgroundColor: '#3b82f6',
        paddingVertical: 10,
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    buttonContent: {
        height: 48,
    },
    footer: {
        marginTop: 32,
        alignItems: 'center',
    },
    socialLoginContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    socialLoginText: {
        color: '#64748b',
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        width: '100%',
    },
    socialButton: {
        flex: 1,
        borderRadius: 12,
        borderColor: '#e2e8f0',
        backgroundColor: '#ffffff',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    signupText: {
        color: '#64748b',
        marginRight: 4,
    },
});