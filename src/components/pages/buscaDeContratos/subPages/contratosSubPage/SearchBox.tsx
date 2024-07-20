import sharedStyles from "@/styles/Shared.module.css";
import styles from "@/styles/BuscaDeContratos.module.css";
import { HiOutlineSearch } from "react-icons/hi";
import Radio from "./Radio";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { SearchTypeEnum } from "@/enums";
import TopErrorModal from "@/components/TopErrorModal";
import { ContratoBuscado, ModalErrorMessage } from "@/entities";
import backendApi from "@/backendApi";
import { FailedToFetchError } from "@/errors";

const size = {
  cnpj: 14,
  cpf: 11,
  contrato: {
    min: 3,
    max: 15,
  },
  nome: {
    min: 2,
    max: 50,
  },
  telefone: {
    min: 10,
    max: 13,
  },
};

interface SearchBoxProps {
  setContratos: Dispatch<SetStateAction<ContratoBuscado[]>>;
}

export default function SearchBox(props: SearchBoxProps): JSX.Element {
  const [searchType, setSearchType] = useState(SearchTypeEnum.cpfCnpj);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(new ModalErrorMessage(""));

  function active(type: SearchTypeEnum): boolean {
    return type === searchType;
  }

  function isValidOnlyNumbers(search: string, maxLenth: number): boolean {
    return search.match(/^\d*$/) && search.length <= maxLenth ? true : false;
  }

  function searchOnChange(event: ChangeEvent<HTMLInputElement>): void {
    if (
      searchType === SearchTypeEnum.cpfCnpj &&
      isValidOnlyNumbers(event.target.value, size.cnpj)
    ) {
      setSearch(event.target.value);
    } else if (
      searchType === SearchTypeEnum.telefone &&
      isValidOnlyNumbers(event.target.value, size.telefone.max)
    ) {
      setSearch(event.target.value);
    } else if (
      searchType === SearchTypeEnum.contrato &&
      event.target.value.length <= size.contrato.max
    ) {
      setSearch(event.target.value);
    } else if (
      searchType === SearchTypeEnum.nome &&
      event.target.value.length <= size.nome.max
    ) {
      setSearch(event.target.value);
    }
  }

  function changeSearchType(type: SearchTypeEnum): void {
    showError("");
    setSearchType(type);
    let partial: string;
    switch (type) {
      case SearchTypeEnum.cpfCnpj:
        partial = letNumbersOnly(search);
        partial = partial.substring(0, size.cnpj);
        setSearch(letNumbersOnly(partial));
        break;
      case SearchTypeEnum.telefone:
        partial = letNumbersOnly(search);
        partial = partial.substring(0, size.telefone.max);
        setSearch(letNumbersOnly(partial));
        break;
      case SearchTypeEnum.contrato:
        partial = search.substring(0, size.contrato.max);
        setSearch(partial);
        break;
      default:
        return;
    }
  }

  function showError(message: string): void {
    const error = new ModalErrorMessage(message);
    setError(error);
  }

  function searchIsValid(): boolean {
    let valid = true;
    switch (searchType) {
      case SearchTypeEnum.cpfCnpj:
        if (search.length !== size.cpf && search.length !== size.cnpj) {
          valid = false;
          showError(
            `CPF/CNPJ Inválido: deve ter ${size.cpf} (CPF) ou ${size.cnpj} (CNPJ) caracteres.`
          );
        }
        break;

      case SearchTypeEnum.contrato:
        if (
          search.length < size.contrato.min ||
          search.length > size.contrato.max
        ) {
          valid = false;
          showError(
            `Contrato deve ter entre ${size.contrato.min} e ${size.contrato.max} caracteres.`
          );
        }
        break;

      case SearchTypeEnum.telefone:
        if (
          search.length < size.telefone.min ||
          search.length > size.telefone.max
        ) {
          valid = false;
          showError(
            `Telefone deve ter entre ${size.telefone.min} e ${size.telefone.max} caracteres.`
          );
        }
        break;

      case SearchTypeEnum.nome:
        if (search.length < size.nome.min || search.length > size.nome.max) {
          valid = false;
          showError(
            `Nome deve ter entre ${size.nome.min} e ${size.nome.max} caracteres.`
          );
        }
        break;

      default:
        valid = false;
        showError("Tipo de busca inválido");
    }
    return valid;
  }

  function letNumbersOnly(input: string): string {
    return input.replace(/\D+/g, "");
  }

  async function doSearch() {
    if (searchIsValid()) {
      try {
        const data = await backendApi.buscarContratos(search, searchType);
        props.setContratos(data);
      } catch (error) {
        if (error instanceof FailedToFetchError) {
          //TBD api fetch error
          //setError(true);
        } else {
          throw error;
        }
      }
    }
  }

  const searchBoxStyle = [sharedStyles.shadowBorder, styles.searchBox].join(
    " "
  );

  return (
    <>
      <TopErrorModal error={error} />
      <div className={searchBoxStyle}>
        <div className={styles.searchFieldContainer}>
          <input
            className={styles.textInput}
            type="text"
            value={search}
            onChange={searchOnChange}
          />
          <div className={styles.searchButton} onClick={doSearch}>
            <HiOutlineSearch />
          </div>
        </div>
        <div className={styles.radioContainer}>
          <Radio
            text={"CPF/CNPJ"}
            onClick={() => {
              changeSearchType(SearchTypeEnum.cpfCnpj);
            }}
            active={active(SearchTypeEnum.cpfCnpj)}
          ></Radio>
          <Radio
            text={"CONRATO"}
            onClick={() => {
              changeSearchType(SearchTypeEnum.contrato);
            }}
            active={active(SearchTypeEnum.contrato)}
          ></Radio>
          <Radio
            text={"FONE"}
            onClick={() => {
              changeSearchType(SearchTypeEnum.telefone);
            }}
            active={active(SearchTypeEnum.telefone)}
          ></Radio>
          <Radio
            text={"NOME"}
            onClick={() => {
              changeSearchType(SearchTypeEnum.nome);
            }}
            active={active(SearchTypeEnum.nome)}
          ></Radio>
        </div>
      </div>
    </>
  );
}
