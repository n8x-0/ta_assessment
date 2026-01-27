import useCustomQuery from "../hooks/queryService-hook.ts";
import { getCurrencies } from "../utils/services.ts";
import CurrencyConverterform from "../components/currencyConverter/CurrencyConverterform.tsx";
import Container from "react-bootstrap/esm/Container";
import { Alert } from "react-bootstrap";

const CurrencyConvertor = () => {
  const { data, error, isLoading } = useCustomQuery(getCurrencies);

  if (error) {
    return <Container className="mt-4">
      <Alert key="danger" variant="danger">
        {error}
      </Alert>
    </Container>;
  }

  return (
    <CurrencyConverterform isLoading={isLoading} error={error} currenciesData={data} />
  );
};

export default CurrencyConvertor;
