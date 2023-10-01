import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getErrorLogById, updateErrorLogById } from 'apiSdk/error-logs';
import { errorLogValidationSchema } from 'validationSchema/error-logs';
import { ErrorLogInterface } from 'interfaces/error-log';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { getUsers } from 'apiSdk/users';
import { getOrganizations } from 'apiSdk/organizations';

function ErrorLogEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ErrorLogInterface>(
    () => (id ? `/error-logs/${id}` : null),
    () => getErrorLogById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ErrorLogInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateErrorLogById(id, values);
      mutate(updated);
      resetForm();
      router.push('/error-logs');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ErrorLogInterface>({
    initialValues: data,
    validationSchema: errorLogValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Error Logs',
              link: '/error-logs',
            },
            {
              label: 'Update Error Log',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Error Log
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.error_message}
            label={'Error Message'}
            props={{
              name: 'error_message',
              placeholder: 'Error Message',
              value: formik.values?.error_message,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Error Code"
            formControlProps={{
              id: 'error_code',
              isInvalid: !!formik.errors?.error_code,
            }}
            name="error_code"
            error={formik.errors?.error_code}
            value={formik.values?.error_code}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('error_code', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="occurred_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Occurred At
            </FormLabel>
            <DatePicker
              selected={formik.values?.occurred_at ? new Date(formik.values?.occurred_at) : null}
              onChange={(value: Date) => formik.setFieldValue('occurred_at', value)}
            />
          </FormControl>
          <FormControl id="resolved_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Resolved At
            </FormLabel>
            <DatePicker
              selected={formik.values?.resolved_at ? new Date(formik.values?.resolved_at) : null}
              onChange={(value: Date) => formik.setFieldValue('resolved_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/error-logs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'error_log',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ErrorLogEditPage);
