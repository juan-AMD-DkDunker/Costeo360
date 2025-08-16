
import { registerUser } from "@/services/auth/authService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function CreateAccountScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [businessName, setBusinessName] = useState('');
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

    const handleSignup = () => {
        setIsLoading(true);

        if (!email && !password) return;
        registerUser(email, password, businessName).then((userCredential) => {
            console.log('Account created');
            const user = userCredential.user;
            console.log(user)
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
        });
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleLogin = () => {
        router.back();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                <SafeAreaView style={styles.safeArea}>
                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('@/assets/images/splash-icon.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text variant="headlineMedium" style={styles.title}>
                                Crear Cuenta
                            </Text>
                            <Text variant="bodyMedium" style={styles.subtitle}>
                                Empieza a gestionar tus recetas y costes
                            </Text>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput
                                mode="flat"
                                label="Nombre de Empresa"
                                value={businessName}
                                onChangeText={setBusinessName}
                                style={styles.input}
                                left={<TextInput.Icon icon="store-outline" />}
                                theme={{ colors: { primary: theme.colors.primary } }}
                                outlineColor="#e5e7eb"
                                activeOutlineColor={theme.colors.primary}
                            />

                            <TextInput
                                mode="flat"
                                label="Correo"
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
                                label="Contraseña"
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

                            <TextInput
                                mode="flat"
                                label="Confirmar Contraseña"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={secureTextEntry}
                                style={styles.input}
                                left={<TextInput.Icon icon="lock-check-outline" />}
                                theme={{ colors: { primary: theme.colors.primary } }}
                                outlineColor="#e5e7eb"
                                activeOutlineColor={theme.colors.primary}
                            />

                            <Button
                                mode="contained"
                                onPress={handleSignup}
                                style={styles.loginButton}
                                labelStyle={styles.buttonLabel}
                                contentStyle={styles.buttonContent}
                                disabled={!email || !password || !confirmPassword || !businessName || isLoading}
                                icon={isLoading ? () => <ActivityIndicator color="#fff" /> : "account-plus"}
                            >
                                {isLoading ? '' : 'Crear Cuenta'}
                            </Button>

                            <View style={styles.termsContainer}>
                                <Text style={styles.termsText}>
                                    Al crear una cuenta, usted acepta nuestra
                                    <Text style={{ color: theme.colors.primary }}> Terms of Service</Text> y
                                    <Text style={{ color: theme.colors.primary }}> Privacy Policy</Text>
                                </Text>
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.signupText}>¿Ya tienes una cuenta?</Text>
                                <Button
                                    mode="text"
                                    onPress={handleLogin}
                                    textColor={theme.colors.primary}
                                    compact
                                >
                                    Login
                                </Button>
                            </View>
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
        marginTop: 20
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
        letterSpacing: 0.5,
        color:  '#ffffff',
    },
    buttonContent: {
        height: 48,
    },
    footer: {
        marginTop: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
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
    termsContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    termsText: {
        color: '#64748b',
        fontSize: 12,
        textAlign: 'center',
    },
});