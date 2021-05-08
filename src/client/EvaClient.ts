import axios from 'axios';

interface IEvaData {
  data: {
    email_address: string;
    domain: string;
    valid_syntax: boolean;
    disposable: boolean;
    webmail: boolean;
    deliverable: boolean;
    catch_all: boolean;
    gibberish: boolean;
    spam: boolean;
  };
}

class EvaClient {
  readonly baseURL = 'https://api.eva.pingutil.com/email?email=';
  constructor(private request = axios) {}

  public async fetchData(emails: string[]): Promise<IEvaData[]> {
    if (typeof emails === 'string') emails = [emails];

    let result: IEvaData[] = [];
    for (const email of emails) {
      try {
        const r = await this.request.get<IEvaData>(`${this.baseURL}${email}`);
        result.push({ data: r.data.data });
      } catch (err) {
        throw new Error(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`);
      }
    }

    return result;
  }
}

export { EvaClient };
