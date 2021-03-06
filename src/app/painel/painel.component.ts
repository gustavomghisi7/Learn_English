import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})

export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = ''

  public rodada: number = 0;
  public rodadaFrase!: Frase;

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('Componente painel foi destruido')
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {

      //trocar pergunta da rodada
      this.rodada++;

      //incrementa a barra de progresso no componente progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      //verificar vitória
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitória');
      }
      
      //atualiza o objeto rodadaFrase que contém a frase exibida para o usuário
      this.atualizaRodada()
 
    } else {

      //diminuir a variável tentativas
      this.tentativas--
    
      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }

    }
  }

  public atualizaRodada(): void {

    //define a frase da rodada com base em algum critério
    this.rodadaFrase = this.frases[this.rodada];

    //limpar resposta do usuário
    this.resposta = '';

  }
}