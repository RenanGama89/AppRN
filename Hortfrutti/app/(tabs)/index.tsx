import React from 'react';
import { StyleSheet, Button, Alert, TextInput, Image, Modal, Pressable, ActivityIndicator, FlatList, SectionList, Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  // Estados
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isEnabled, setIsEnabled] = React.useState(false); // Estado do Switch

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Dados para FlatList
  const produtos = [
    { id: '1', nome: 'Cebola' },
    { id: '2', nome: 'Beterraba' },
    { id: '3', nome: 'Jaca' },
    { id: '4', nome: 'Cenoura' },
  ];

  // Dados para SectionList
  const DATA = [
    { title: 'Frutas', data: ['Maçã', 'Banana', 'Laranja', 'Abacaxi'] },
    { title: 'Verduras', data: ['Alface', 'Couve', 'Espinafre'] },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isEnabled ? '#11772D' : '#67CB57' }]}>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={{ uri: 'https://crescera.com/wp-content/uploads/2020/02/Hortifruti.jpg' }}
      />

      {/* Título */}
      <Text style={styles.title}>Hortfrutti</Text>

      {/* Botão simples de alerta */}
      <Button
        title="Clique aqui"
        onPress={() => Alert.alert('Tá funcionando!')}
        color={"#006414"}
      />

      {/* Switch para mudar cor do fundo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ marginRight: 10 }}>Alterar cor de fundo:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Botão para abrir o modal */}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}>
        <Text style={styles.textStyle}>Buscar Produto</Text>
      </Pressable>

      {/* Modal */}
      <SafeAreaProvider>
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                  {/* FlatList (produtos) */}
                    <FlatList
                      data={produtos}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => <Text style={styles.item}>{item.nome}</Text>}
                      style={{ maxHeight: 150 }}
                    />
                    {/* SectionList */}
                    <SectionList
                      sections={DATA}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                      renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                      )}
                      style={{ maxHeight: 200 }}
                    />

                    {/* Campo de busca */}
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeText}
                      value={text}
                      placeholder="Nome do Produto"
                    />

                    {/* Campo numérico */}
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeNumber}
                      value={number}
                      placeholder="Valor"
                      keyboardType="numeric"
                    />

                    {/* Botão de fechar modal */}
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Fechar Busca</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    margin: 20,
    color:"black",
  },
  logo: {
    width: 90,
    height: 80,
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: 'blue',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
    width: '100%',
  },
});
