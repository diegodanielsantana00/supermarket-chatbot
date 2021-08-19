var stages = {
  0: {
    descricao: "Boas Vindas",
    obj: require("./stages/0"),
  },
  1: {
    descricao: "Vendas",
    obj: require("./stages/1"),
  },
  2: {
    descricao: "Resumo",
    obj: require("./stages/2"),
  },
  3: {
    descricao: "Endereço",
    obj: require("./stages/3"),
  },
  4: {
    descricao: "Enceramento",
    obj: require("./stages/4"),
  },
  5: {
    descricao: "Forma de Pagamento",
    obj: require("./stages/5"),
  },
  6: {
    descricao: "Forma de pagamento 2",
    obj: require("./stages/6"),
  },
  7: {
    descricao: "Resumo do pedido",
    obj: require("./stages/7"),
  },
  8: {
    descricao: "Impressao do pedido",
    obj: require("./stages/8"),
  },
  9: {
    descricao: "Espera do pedido",
    obj: require("./stages/9"),
  },
  10: {
    descricao: "Adicional do pedido",
    obj: require("./stages/10"),
  },
  11: {
    descricao: "Marketing",
    obj: require("./stages/11"),
  },
};

exports.step = stages;
