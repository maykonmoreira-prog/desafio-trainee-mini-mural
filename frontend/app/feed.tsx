import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
            ActivityIndicator, 
            FlatList,
            Modal,
            StyleSheet,
            Text,
            TextInput,
            TouchableOpacity,
            View
        } from "react-native";

type Post = {
    id: number;
    author: string;
    content: string;
    likes: number;
};

export default function Feed()
{
    const [posts, setPosts] = useState<Post[]>([
        { id: 1, author: "Ana", content: "Primeira publicação do app da ATLASJR!", likes: 0 },
        { id: 2, author: "Bruno", content: "AtlasJR é muito legal.", likes: 0 },
        { id: 3, author: "Maria", content: "Testando o feed de mensagens.", likes: 0 },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [newPostContent, setNewPostContent] = useState("");
    const { username } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    function handleNewPost()
    {
        if (!newPostContent.trim()) return;

        const newPost = {
            id: posts.length + 1,
            author: String(username || "Usuário"),
            content: newPostContent,
            likes: 0
        };

        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setModalVisible(false);
    }

    function handleLike(id: number) 
    {
        setPosts(posts.map(post =>
            post.id === id
                ? { ...post, likes: post.likes + 1 }
                : post
        ));
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ebe948" />
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>

            <TouchableOpacity
                style={styles.newPostButton}
                onPress={() => setModalVisible(true)} >

                <Text style={styles.newPostText}>+ Nova publicação</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Nova publicação</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua publicação..."
                            value={newPostContent}
                            onChangeText={setNewPostContent}
                            multiline
                            numberOfLines={4}
                        />

                        <TouchableOpacity style={styles.publishButton} onPress={handleNewPost}>
                            <Text style={styles.publishText}>Publicar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text style={styles.content}>{item.content}</Text>

                        <TouchableOpacity 
                            style={styles.likeButton}
                            onPress={() => handleLike(item.id)}
                        >
                            <Text style={styles.likeText}>Curtir ({item.likes})</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 24,
        marginTop: 32,
    },
    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: "#fafafa",
    },
    author: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    content: {
        fontSize: 15,
        marginBottom: 12,
        color: "#333",
    },
    likeButton: {
        backgroundColor: "#ebe948",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    likeText: {
        fontWeight: "bold",
        color: "#000",
    },
    newPostButton: {
        backgroundColor: "#000",
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: "center",
    },
    newPostText: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },

    publishButton: {
        backgroundColor: "#ebe948",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },

    publishText: {
        fontWeight: "bold",
    },

    cancelText: {
        textAlign: "center",
        color: "red",
    },
});