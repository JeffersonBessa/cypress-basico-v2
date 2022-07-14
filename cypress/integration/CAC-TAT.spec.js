/// <reference types="Cypress" />

//define a descricao da suite de testes e uma funcao de callback
describe('Central de Atendimento ao Cliente TAT', function(){
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    //define a descricao do caso de teste e uma funcao de callback
    //CT001
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //CT002
    it('preenche os campos obrigatórios e envia o formulário:', function(){
        const longtext = "Teste, teste, teste, teste, teste, teste, teste, teste, teste" 

        cy.clock() //congela o relogio do navegador

        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Bessa')
        cy.get('#email').type('jefferson@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS) //avança o relogio do navegador por 3s

        cy.get('.success').should('not.be.visible')
    })

    //CT003
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação', function(){
        
        cy.clock()  
      
        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Bessa')
        cy.get('#email').type('jefferson@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    //CT004
    it('campo telefone continua vazio quando preechido com valor nao numerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '');  
    })

    //CT005
    it('campo telefone continua vazio quando preechido com valor nao-numerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '');  
    })

     //CT006
     it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do form', function(){
        
        cy.clock()

        cy.get('#firstName').type('Jefferson')
        cy.get('#lastName').type('Bessa')
        cy.get('#email').type('jefferson@exemplo,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

      //CT007
      it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Jefferson')
            .should('have.value', 'Jefferson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Bessa')
            .should('have.value', 'Bessa')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('jefferson@exemplo,com')
            .should('have.value', 'jefferson@exemplo,com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

      //CT008
      it('exibe mensagem de erro ao submeter um formulário sem preencher os campos obrigatórios', function(){
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

      //CT009
      it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

      //CT010
      it('seleciona um produto(YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

      //CT011
      it('seleciona um produto(Mentoria) por seu valor', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

      //CT012
      it('seleciona um produto(Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

      //inputs tipo radio
      //CT013
      it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"')
            .check()
            .should('have.value', 'feedback')
    })

      //CT014
      it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
        })
    })

     //inputs tipo checkbox
     //CT015
     it('marca ambos os checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last().uncheck()
            .should('not.be.checked')
    })

     //upload de arquivos
     //CT015
     it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

     //upload de arquivos com drag-and-drop
     //CT016
     it('seleciona um arquivo simulando drag-and-drop', function(){
      cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
              expect($input[0].files[0].name).to.equal('example.json')
          })
  })

      //CT017
      it('seleciona um arquivo utilizando uma fixture para o qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
          })
  })

      //CT018
      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

     //CT019
      it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
          .invoke('removeAttr', 'target')
          .click()

        cy.contains('Talking About Testing').should('be.visible')  
  })

      //CT019
      it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')  
  })

      //CT020
      it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      //CT021
      it('preenche a área de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20)
        
        cy.get('#open-text-area')
          .invoke('val', longText)
          .should('have.value', longText)
      })

      //CT022
      it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response){
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
          })
      })

      //CT023 - Desafio
      it.only('encontra o gato escondido', function(){
        cy.get('#cat')
          .invoke('show')
          .should('be.visible')
          .invoke('hide')
          .should('not.be.visible')
       cy.get('#title')
          .invoke('text', 'CAT TAT')
       cy.get('#subtitle')
          .invoke('text', 'Eu <3 gatos!')      
      })
})
