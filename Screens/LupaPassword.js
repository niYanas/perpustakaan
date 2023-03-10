import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextBase,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import FormError from "../Components/FormError";
import FormSuccess from "../Components/FormSuccess";
import { getAuth, updatePassword, sendPasswordResetEmail } from "firebase/auth";

const LupaPassword = () => {
  const [password, setPassword] = useState();
  const [konPassword, setKonPassword] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [displayFormError, setDisplayFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // async function updatePasword() {
  //   updatePassword(user, password)
  //     .then(() => {
  //       alert("Password berhasil di-ubah!");
  //     })
  //     .catch((error) => {
  //       alert("Password gagal di-ubah!");
  //     });
  // }

  async function updatePassword() {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email telah dikirimkan!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  // const validateForm = () => {
  //   var form_inputs = [password, konPassword];

  //   var password_match = password == konPassword;

  //   // if (form_inputs.includes("") || form_inputs.includes(undefined)) {
  //   //   setErrMessage("Daftar akun gagal, mohon isi semua baris");
  //   //   return setDisplayFormError(true);
  //   // }

  //   if (!password_match) {
  //     setErrMessage("Password tidak cocok");
  //     return setDisplayFormError(true);
  //   }

  //   if (password_match) updatePassword();
  // };
  return (
    <View style={styles.mainView}>
      <Image style={styles.ImageStyle} source={require("../assets/logo.png")} />
      <View style={styles.FormView}>
        {/* <TextInput
          mode="outlined"
          activeOutlineColor="green"
          activeUnderlineColor="red"
          secureTextEntry={true}
          label={"Password*"}
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor="green"
          activeUnderlineColor="red"
          secureTextEntry={true}
          label={"Konfirmasi Password*"}
          value={konPassword}
          onChangeText={(val) => setKonPassword(val)}
        /> */}
        <TextInput
          mode="outlined"
          activeOutlineColor="green"
          activeUnderlineColor="red"
          label={"Masukkan E-mail"}
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
      </View>
      <TouchableOpacity style={styles.Button} onPress={() => updatePassword()}>
        <Text style={styles.btnText}>Ubah Password</Text>
      </TouchableOpacity>

      {displayFormError == true ? (
        <FormError hideErrOverlay={setDisplayFormError} err={errMessage} />
      ) : null}

      {isLoading == true ? (
        <FormSuccess />
      ) : successMessage == "Akun berhasil dibuat, silahkan login" ? (
        <FormSuccess
          successMessage={successMessage}
          close={setSuccessMessage}
        />
      ) : null}
    </View>
  );
};

export default LupaPassword;

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageStyle: {
    width: "80%",
    height: "30%",
    resizeMode: "contain",
  },
  container: {
    width: "80%",
  },
  FormView: {
    width: "85%",
  },
  Button: {
    backgroundColor: "#808080",
    marginTop: 30,
    width: "70%",
    padding: 7,
    borderRadius: 20,
    shadowOffset: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
