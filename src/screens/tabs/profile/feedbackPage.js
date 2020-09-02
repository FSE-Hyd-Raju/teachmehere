import React, { Fragment } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import Theme from '../../../Theme';
import { useDispatch, useSelector } from 'react-redux'
import { signupSelector } from '../../../redux/slices/signupSlice'
import PageSpinner from '../../../components/common/PageSpinner';
import * as yup from 'yup'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-picker';
import { changeProfileSelector, clearProfileErrors, onChangeProfilePressed } from '../../../redux/slices/changeProfileSlice';
import { loadUserInfo, loginSelector } from '../../../redux/slices/loginSlice'

export default function feedbackPage({ navigation }) {

    const dispatch = useDispatch()
    const { DescriptionError, loading } = useSelector(changeProfileSelector);


    const descriptionComponent = () => {

        const onsubmit = (values) => {

        }
        return (
            <Formik
                initialValues={{ description: '' }}
                onSubmit={values => onsubmit(values)}
                validationSchema={yup.object().shape({
                    description: yup
                        .string()
                })}>
                {({
                    values,
                    handleChange,
                    errors,
                    setFieldTouched,
                    touched,
                    isValid,
                    handleSubmit,
                }) => (
                        <Fragment>
                            <View >
                                <TextInput
                                    style={{
                                        borderBottomColor: '#000000',
                                        borderBottomWidth: 1,
                                    }}
                                    placeholder="Tell others about yourself"
                                    multiline
                                    numberOfLines={4}
                                    errorMessage={DescriptionError}
                                    value={values.description}
                                    onChangeText={(e) => {
                                        handleChange("description")(e);
                                    }}
                                // onBlur={() => setFieldTouched('description')}
                                />
                                {touched.description && errors.description &&
                                    <Text style={{ fontSize: 12, color: 'red', textAlign: "center", marginTop: -15 }}>{errors.description}</Text>
                                }
                            </View>
                            <Button
                                title="Send"
                                disabled={!isValid}
                                type="solid"
                                containerStyle={styles.loginButton}
                                onPress={handleSubmit}
                            />
                        </Fragment>
                    )}
            </Formik>
        );
    };

    const headerComponent = () => {
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                // marginTop: 20,
                marginBottom: 50,
            }}>
                <Text style={{ fontSize: 20, color: "black", letterSpacing: 1, fontWeight: "bold" }}>Submit your feedbackPage</Text>
            </View>
        )
    }

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                <View>
                    {headerComponent()}
                    {descriptionComponent()}
                </View>
                <PageSpinner visible={loading} />
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: "rgb(255, 255, 255)"
    },
    loginButton: {
        alignSelf: 'center',
        // marginVertical: Theme.spacing.small,
        marginVertical: 35,
        width: 180,
        borderRadius: 20
    },
    userImageContainer: {
        justifyContent: "center",
        alignItems: "center",
    }
});
