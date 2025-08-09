import CostingButton from "@/components/CostingButton";
import CostingHeader from "@/components/CostingHeader";
import CostingSafeAreaView from "@/components/CostingSafeAreaView";
import CostingText from "@/components/CostingText";
import useTranslation from "@/hooks/useTranslation";
//import { useAppSelector } from "@/redux/hooks";
import { spacing } from "@/styles";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function AccountScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  //const user = useAppSelector((state) => state.user);

  /*const createAccountHandler = () => {
    router.push('/(tabs)/account/create-account');
  }

  const createStoreHandler = () => {
    console.log('store');
    router.push('/(tabs)/account/create-store');
  }*/

  /*const sections = [
    {
      label: t('account.user.name'),
      value: `${user?.name} ${user?.lastName}`,
      onPress: () => { },
    },

    {
      label: t('account.user.lastName'),
      value: `+51${user?.phoneNumber}`,
      onPress: () => { },
    },
  ]*/

  return (
    <CostingSafeAreaView>
      <CostingHeader title={`${t('account.title')}`} />
      <View style={{ flex: 1 }}>
        {
            <View style={styles.emptyContainer}>
              <CostingText style={styles.emptyPlaceholder}>
                {`${t('account.empty.placeholder')}`}
              </CostingText>
              <CostingButton mode={'contained'} onPress={() => {}}>
                {`${t('account.empty.button')}`}
              </CostingButton>

            </View>
        }
      </View>
    </CostingSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  emptyContainer: {
    paddingHorizontal: spacing.m,
    flex: 1,
    justifyContent: 'center',
  },
  emptyPlaceholder: {
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: spacing.m,
    paddingLeft: 0,
    marginLeft: spacing.m,
  },
  subtitle: {
    marginBottom: spacing.m,
    fontSize: 20,
  },
  createStore: {
    textAlign: 'center',
    marginBottom: spacing.m,
  }

})