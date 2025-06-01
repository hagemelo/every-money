import { EveryMoneyDomain } from "@domain/every-money.domain";
import { EveryMoneyEntity } from "@domain/every-money.entity";
import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository";
import { FindOptionsWhere, Repository } from "typeorm";

export abstract class RepositoryPostgres<E extends EveryMoneyEntity, D extends EveryMoneyDomain> implements EveryMoneyRepository<E, D> {
    

    abstract getRepository(): Repository<E>
    
    async findAll(): Promise<E[]> {
        return await this.getRepository().find();
    }

    async findById(id: FindOptionsWhere<E>): Promise<E> {
        return await this.getRepository().findOneBy(id);
    }

    abstract saveDomain(domain: D): Promise<D>;

    async delete(id: number): Promise<void> {
        await this.getRepository().delete(id);
    }
}
