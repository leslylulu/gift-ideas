import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MessageModal = ({ visible = false, title, type, message, onConfirm, onCancel }) => {

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.warning}>
            {
              type === "Warning" ?
                <FontAwesome name="warning" size={24} color="black" />
                :
                <MaterialIcons name="error" size={24} color="black" />
            }
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonGroup}>
            {onCancel && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
            {onConfirm && (
              <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                <Text style={styles.confirmBtnText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  warning: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: "red",
    fontFamily: "Poppins_700Bold",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#DDF42B",
    width: "45%",
    alignItems: "center",
  },
  confirmBtnText: {
    color: "#000",
    fontFamily: "Poppins_700Bold",
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ccc",
    width: "45%",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#000",
    fontFamily: "Poppins_700Bold",
  },
});

export default MessageModal;
