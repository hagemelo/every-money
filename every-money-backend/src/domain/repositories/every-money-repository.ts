import { EveryMoneyDomain } from "@domain/every-money.domain"
import { EveryMoneyEntity } from "@domain/every-money.entity"
import { FindOptionsWhere } from "typeorm"

export interface EveryMoneyRepository<E extends EveryMoneyEntity, D extends EveryMoneyDomain> {
    findAll(): Promise<E[]>
    findById(id: FindOptionsWhere<E>): Promise<E>
    saveDomain(domain: D): Promise<D>
    delete(id: number): Promise<void>
}