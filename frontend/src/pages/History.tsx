import { useContext } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import {
  CurrencyConvertorContext,
  type CurrencyConvertorContextType,
} from "../context/currencyConvertor/context";

const History = () => {
  const { convertedCurrencyHistory } = useContext(CurrencyConvertorContext) as CurrencyConvertorContextType;

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-primary mb-1">My Conversions</h2>
      <p className="text-muted mb-4">
        Only the last <Badge bg="secondary">20</Badge> conversions are stored
      </p>

      <Table hover responsive bordered>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {convertedCurrencyHistory.length > 0 ? (
            convertedCurrencyHistory.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted py-4">
                No conversion history available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default History;
