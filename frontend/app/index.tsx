import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {

    const [username, setUsername] = useState("");

    return(
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>  
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" 
      showsVerticalScrollIndicator={false}>
        <View style={styles.container}>  
           <Image source={require('../assets/images/Login.png')} style={styles.illustration} />

           <Text style={styles.title}>Entrar</Text>
           <Text style={styles.subtitle}>Acesse sua conta com Usuário e Senha</Text>

           <View style={styles.form}>

            <Input
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
            />

            <Input placeholder="Senha" secureTextEntry />

            <Button
                label="Entrar"
                onPress={() => {
                    if (!username.trim()) {
                        alert("Digite um usuário");
                        return;
                    }

                    router.push({
                        pathname: "/feed",
                        params: { username }
                    });
                }}
            />

           </View>

            <Text style={styles.footer}> Não tem uma conta? 
                <Link href="/signup" style={styles.footerLink}>Cadastre-se aqui.</Link>
            </Text>
        </View> 
      </ScrollView>  
    </KeyboardAvoidingView>    
    )
    }
  
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 32,
            backgroundColor: '#fff',
        },
        illustration: {
            width: '100%',
            height: 330,
            resizeMode: 'contain',
            marginTop: 62,
            transform: [{ translateX: 0 }],
        },
        title: {
            fontSize: 32,
            fontWeight: 900,
        },
        subtitle: {
            fontSize: 16,
        },
        form: {
            marginTop: 24,
            gap: 12,
        },
        footer: {
            marginTop: 24,
            textAlign: 'center',
            color: '#585860',
        },
        footerLink: {
            color: '#eeea1b',
            fontWeight: 700,
        },
    });
    