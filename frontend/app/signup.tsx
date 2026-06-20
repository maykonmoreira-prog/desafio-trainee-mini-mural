import { Input } from "@/components/Input";
import {Button} from "@/components/Button"; 
import {Link} from "expo-router";
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
export default function SignUp() {
    return(
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>  
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" 
      showsVerticalScrollIndicator={false}>
        <View style={styles.container}>  
           <Image source={require('../assets/images/Boneco-atlas.jpg')} style={styles.illustration} />

           <Text style={styles.title}>Cadastrar</Text>
           <Text style={styles.subtitle}>Crie sua conta para acessar o aplicativo.</Text>

           <View style={styles.form}>
            <Input placeholder="Nome" keyboardType="email-address" />
            <Input placeholder="Nome de Usuário" keyboardType="email-address" />
            <Input placeholder="Senha" secureTextEntry />
            <Input placeholder="Confirmar Senha" secureTextEntry />
            <Button label="Cadastrar"/>
           </View>

            <Text style={styles.footer}> Já tem uma conta? 
                <Link href="/" style={styles.footerLink}>Entre aqui.</Link>
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
            transform: [{ translateX: 25 }],
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
    