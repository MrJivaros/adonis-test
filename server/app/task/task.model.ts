import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from "luxon"

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string | null

  @column()
  public done: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

}
